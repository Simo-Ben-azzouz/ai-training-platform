import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AnamEvent, createClient } from '@anam-ai/js-sdk';
import { firstValueFrom } from 'rxjs';
import { API_BASE_URL } from '../core/config/api.config';
import { AskAnamRequest, AskAnamResponse, ChatMessage } from '../models/anam.model';

@Injectable({ providedIn: 'root' })
export class AnamService {
  private readonly http = inject(HttpClient);
  private client: ReturnType<typeof createClient> | null = null;
  readonly active = signal(false);
  readonly connecting = signal(false);
  readonly error = signal<string | null>(null);
  readonly transcript = signal<ChatMessage[]>([]);

  async start(sessionId: string, context: string, videoElementId: string): Promise<AskAnamResponse> {
    this.connecting.set(true);
    this.error.set(null);
    try {
      const response = await firstValueFrom(
        this.http.post<AskAnamResponse>(`${API_BASE_URL}/Anam/ask`, { sessionId, question: context } satisfies AskAnamRequest)
      );
      this.client = createClient(response.sessionToken);
      this.client.addListener(
        AnamEvent.MESSAGE_HISTORY_UPDATED,
        (messages: Array<{ id: string; content: string; role: string }>) => {
          this.transcript.set(messages.map(message => ({
            id: message.id,
            role: message.role === 'user' ? 'learner' : 'trainer',
            content: message.content,
            createdAt: new Date()
          })));
        }
      );
      await this.client.streamToVideoElement(videoElementId);
      this.active.set(true);
      return response;
    } catch (error) {
      this.error.set('La connexion au coach IA a echoue. Verifiez la session et reessayez.');
      throw error;
    } finally {
      this.connecting.set(false);
    }
  }

  sendMessage(content: string): void {
    if (!this.client || !this.active()) return;
    this.client.sendUserMessage(content);
  }

  setMuted(muted: boolean): void {
    if (!this.client || !this.active()) return;
    if (muted) this.client.muteInputAudio();
    else this.client.unmuteInputAudio();
  }

  stop(): void {
    this.client?.stopStreaming();
    this.client = null;
    this.active.set(false);
  }
}
