import { Plugin } from 'obsidian';
import _metascraper from 'metascraper'
import msAuthor from 'metascraper-author'
import msDate from 'metascraper-date'
import msDescription from 'metascraper-description'
import msTitle from 'metascraper-title'
import msURL from 'metascraper-url'
// import got from 'got'

import { ArticleScraperSettings, DEFAULT_SETTINGS } from './Settings'

type MetascraperInputType = {
  html: string;
  url: string;
}

export default class ArticleScraper extends Plugin {
  settings: ArticleScraperSettings;

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
    // const { body: html, url } = await got(this._url)
    const resPromise = await fetch(url)
    const html = await resPromise.text()

    const metadata = await this._scraper({ html, url })
    console.log(metadata)
    return metadata
  }

  _scraper({ html, url }: MetascraperInputType) {
    const scraper = _metascraper([
      msAuthor(),
      msDate(),
      msDescription(),
      msTitle(),
      msURL()
    ])
    return scraper({ html, url })
  }
}
