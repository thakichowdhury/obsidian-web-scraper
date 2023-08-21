import { Plugin, request } from 'obsidian';

import { ArticleScraperSettings, ArticleScraperSettingsType, DEFAULT_SETTINGS } from './Settings'
import MetaScraper from './MetaScraper';

export default class ArticleScraper extends Plugin {
  settings: ArticleScraperSettingsType;

  async onload() {
    await this.loadSettings();

    this.addSettingTab(new ArticleScraperSettings(this.app, this));
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
