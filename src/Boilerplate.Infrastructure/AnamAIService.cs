using Boilerplate.Application.Common;
using Boilerplate.Domain.Entities.Common;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;

namespace Boilerplate.Infrastructure;

public class AnamAIService : IAITrainerService
{
    private const string SessionTokenEndpoint = "auth/session-token";
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;
    private readonly ILogger<AnamAIService> _logger;

    public AnamAIService(
        HttpClient httpClient,
        IConfiguration configuration,
        ILogger<AnamAIService> logger)
    {
        _httpClient = httpClient;
        _configuration = configuration;
        _logger = logger;
    }

    public async Task<AnamTrainingSession> CreateTrainingSessionAsync(
        SessionId sessionId,
        FormationId formationId,
        string prompt,
        CancellationToken cancellationToken)
    {
        var apiKey = _configuration["AnamAI:ApiKey"];
        if (string.IsNullOrWhiteSpace(apiKey))
        {
            throw new InvalidOperationException("AnamAI:ApiKey must be configured.");
        }

        var request = new AnamSessionTokenRequest(
            new AnamPersonaConfig(
                _configuration["AnamAI:PersonaId"],
                _configuration["AnamAI:PersonaName"],
                _configuration["AnamAI:AvatarId"],
                _configuration["AnamAI:VoiceId"],
                _configuration["AnamAI:LlmId"],
                BuildSystemPrompt(sessionId, formationId, prompt)),
            $"training-session-{sessionId}",
            new AnamSessionOptions(GetConfiguredInt("AnamAI:SessionDurationSeconds")));

        using var response = await SendWithRetryAsync(request, apiKey, cancellationToken);
        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadAsStringAsync(cancellationToken);
            _logger.LogWarning(
                "Anam.ai session token request failed with status {StatusCode}: {Error}",
                response.StatusCode,
                error);

            throw new HttpRequestException(
                "Anam.ai session token request failed.",
                null,
                response.StatusCode);
        }

        var tokenResponse = await response.Content.ReadFromJsonAsync<AnamSessionTokenResponse>(cancellationToken);
        if (string.IsNullOrWhiteSpace(tokenResponse?.SessionToken))
        {
            throw new InvalidOperationException("Anam.ai returned an empty session token.");
        }

        return new AnamTrainingSession(tokenResponse.SessionToken);
    }

    private async Task<HttpResponseMessage> SendWithRetryAsync(
        AnamSessionTokenRequest request,
        string apiKey,
        CancellationToken cancellationToken)
    {
        const int maxAttempts = 3;

        for (var attempt = 1; attempt <= maxAttempts; attempt++)
        {
            try
            {
                using var httpRequest = new HttpRequestMessage(HttpMethod.Post, SessionTokenEndpoint)
                {
                    Content = JsonContent.Create(request)
                };
                httpRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

                var response = await _httpClient.SendAsync(httpRequest, cancellationToken);
                if (!ShouldRetry(response.StatusCode) || attempt == maxAttempts)
                {
                    return response;
                }

                response.Dispose();
            }
            catch (TaskCanceledException) when (!cancellationToken.IsCancellationRequested && attempt < maxAttempts)
            {
                _logger.LogWarning("Anam.ai request timed out. Retrying attempt {Attempt}.", attempt + 1);
            }
            catch (HttpRequestException) when (attempt < maxAttempts)
            {
                _logger.LogWarning("Anam.ai request failed. Retrying attempt {Attempt}.", attempt + 1);
            }

            await Task.Delay(TimeSpan.FromMilliseconds(200 * attempt), cancellationToken);
        }

        throw new HttpRequestException("Anam.ai request failed after retries.");
    }

    private static bool ShouldRetry(HttpStatusCode statusCode)
    {
        return statusCode == HttpStatusCode.RequestTimeout ||
               statusCode == HttpStatusCode.TooManyRequests ||
               (int)statusCode >= 500;
    }

    private string BuildSystemPrompt(SessionId sessionId, FormationId formationId, string prompt)
    {
        var configuredPrompt = _configuration["AnamAI:SystemPrompt"];
        var basePrompt = string.IsNullOrWhiteSpace(configuredPrompt)
            ? "You are an AI trainer helping a learner during a training session."
            : configuredPrompt;

        return $"{basePrompt}\nTraining session id: {sessionId}.\nFormation id: {formationId}.\nLearner context: {prompt}";
    }

    private int? GetConfiguredInt(string key)
    {
        return int.TryParse(_configuration[key], out var value) ? value : null;
    }

    private sealed record AnamSessionTokenRequest(
        [property: JsonPropertyName("personaConfig")] AnamPersonaConfig PersonaConfig,
        [property: JsonPropertyName("clientLabel")] string ClientLabel,
        [property: JsonPropertyName("sessionOptions")] AnamSessionOptions SessionOptions);

    private sealed record AnamPersonaConfig(
        [property: JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        [property: JsonPropertyName("personaId")] string? PersonaId,
        [property: JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        [property: JsonPropertyName("name")] string? Name,
        [property: JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        [property: JsonPropertyName("avatarId")] string? AvatarId,
        [property: JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        [property: JsonPropertyName("voiceId")] string? VoiceId,
        [property: JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        [property: JsonPropertyName("llmId")] string? LlmId,
        [property: JsonPropertyName("systemPrompt")] string SystemPrompt);

    private sealed record AnamSessionOptions(
        [property: JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        [property: JsonPropertyName("maxDurationSeconds")] int? MaxDurationSeconds);

    private sealed record AnamSessionTokenResponse(
        [property: JsonPropertyName("sessionToken")] string SessionToken);
}
