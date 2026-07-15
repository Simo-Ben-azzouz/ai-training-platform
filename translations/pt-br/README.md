# dotnet-api-boilerplate

Projeto WebApi em `.NET 9.0` com Minimal APIs, MediatR, Swagger, Mapperly, Serilog, Entity Framework Core e MySQL.

## Como executar

1. Inicie uma instancia MySQL ou execute apenas o banco via Docker:

```bash
docker-compose up -d db-server
```

2. Execute a API a partir de `src/Boilerplate.Api`:

```bash
dotnet run
```

3. Acesse o Swagger em `/swagger`.

## Testes

Os testes de integracao usam Testcontainers com MySQL. Para executar:

```bash
dotnet test
```

## Dominio atual

O dominio atual contem Category, Formation, Session, UserSession e o treinador virtual Anam AI.
