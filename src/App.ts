import { Plugin, request } from 'obsidian';

import { ArticleScraperSettings, ArticleScraperSettingsType, DEFAULT_SETTINGS } from './Settings'
import MetaScraper from './MetaScraper';

type MetascraperInputType = {
  html: string;
  url: string;
}

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

    const metadata = await this._scraper({ html, url })
    console.log(metadata)
    return metadata
  }

  private _scraper({ html, url }: MetascraperInputType) {
    const metaScraper = new MetaScraper({ fields: this.settings }).scraper
    return metaScraper({ html, url })
  }

  // private _fieldScrapers() {
  //   const fieldScrapers = {
  //     author: msAuthor(),
  //     publishedDate: msDate(),
  //     description: msDescription(),
  //     title: msTitle(),
  //     link: msURL()
  //   }
    
  //   // return Object.keys(fieldScrapers).filter((field) => this.settings[field as keyof ArticleScraperSettingsType])
  //   return Object.keys(fieldScrapers)
  //     .filter((field) => this.settings[field as keyof ArticleScraperSettingsType])
  //     .map((field) => fieldScrapers[field as keyof typeof fieldScrapers])
  // }
}
