import { Injectable } from '@angular/core';
import { Profile } from '../models/discord-profile.model';

@Injectable({
  providedIn: 'root'
})
export class DiscordApiService {
  private apiUrl = '/discord/data/profile/';

  constructor() { }

  async getDiscordUser(id: string): Promise<Profile> {
    try {
      const response = await fetch(this.apiUrl + id, {
        headers: {
          'Content-Type': 'application/json',
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