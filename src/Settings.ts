import ArticleScraper from "./App";
import { App, PluginSettingTab, Setting } from "obsidian";

export interface ArticleScraperSettingsType {
  author: boolean;
  publishedDate: boolean;
  description: boolean,
  title: boolean,
  link: boolean,
  image: boolean,
  language: boolean,
  logo: boolean,
  publisher: boolean,
  feed: boolean,
  favicon: boolean,
}

export const DEFAULT_SETTINGS: Partial<ArticleScraperSettingsType> = {
  author: false,
  publishedDate: false,
  description: false,
  title: false,
  link: false,
  image: false,
  language: false,
  logo: false,
  publisher: false,
  feed: false,
  favicon: false,
}


export class ArticleScraperSettings extends PluginSettingTab {
  plugin: ArticleScraper
  _container: HTMLElement

  constructor(app: App, plugin: ArticleScraper) {
    super(app, plugin);
    this.plugin = plugin;
    this._container = this.containerEl
  }

  private _createSettingsToggle(settingKey: keyof ArticleScraperSettingsType) {
    const keyTitleCase = this._camelCaseToTitleCase(settingKey)

    new Setting(this._container)
      .setName(keyTitleCase)
      .setDesc(`Fetch article ${keyTitleCase.toLowerCase()}.`)
      .addToggle((val) =>
        val
          .setValue(this.plugin.settings[settingKey])
          .onChange(async (val) => {
            this.plugin.settings[settingKey] = val
            await this.plugin.saveSettings()
          })
        )
  }

  private _camelCaseToTitleCase(str: string) {
    return str
      .split(/(?<!^)(?=[A-Z])/)
      .map((word: string) => word[0].toUpperCase() + word.slice(1))
      .join(' ')
  }

  display(): void {
    this._container.empty()

    // create toggle setting for each field
    Object.keys(this.plugin.settings)
      .forEach((settingKey: keyof ArticleScraperSettingsType) => this._createSettingsToggle(settingKey))
  }
}
