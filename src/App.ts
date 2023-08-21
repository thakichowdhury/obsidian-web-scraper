import { Plugin, request } from 'obsidian';

import { WebScraperSettings, WebScraperSettingsType, DEFAULT_SETTINGS } from './Settings'
import MetaScraper from './MetaScraper';

export default class WebScraper extends Plugin {
  settings: WebScraperSettingsType;

  async onload() {
    await this.loadSettings();

    this.addSettingTab(new WebScraperSettings(this.app, this));
  }

  async loadSettings() {
    const settingsData = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.settings = settingsData
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async fetchData(url: string) {
    const html = await request(url)

    const scraper = new MetaScraper({ fields: this.settings }).scraper
    const metadata = await scraper({ html, url })
    console.log(`Metadata for ${url}:`, metadata)

    return metadata
  }
}
