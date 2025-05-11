import { Injectable } from '@angular/core';
import { Profile } from '../models/discord-profile.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscordApiService {
  private apiUrl = environment.production
  ? '/api/proxy?id=' // Vercel serverless function
  : '/discord/data/profile/'; // Local proxy

  constructor() { }

  async getDiscordUser(id: string): Promise<Profile> {
    try {
      const response = await fetch(this.apiUrl + id, {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: Profile = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
}