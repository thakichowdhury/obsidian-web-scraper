import ArticleScraper from "./App";
import { App, PluginSettingTab, Setting } from "obsidian";

export interface ArticleScraperSettings {
  author: boolean;
  publishedDate: boolean;
  description: boolean;
  title: boolean;
  url: boolean;
}

export const DEFAULT_SETTINGS: Partial<ArticleScraperSettings> = {
  author: false,
  publishedDate: false,
  description: false,
  title: false,
  url: false
};

export class ArticleScraperSettings extends PluginSettingTab {
  plugin: ArticleScraper;

  constructor(app: App, plugin: ArticleScraper) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName("Author")
      .setDesc("Fetch the article's author.")
      .addToggle((val) => val
                 .onChange(async (val) => {
                   console.log(val)
                   this.plugin.settings.author = val
                   await this.plugin.saveSettings()
                 })
                )

    new Setting(containerEl)
      .setName("Published Date")
      .setDesc("Fetch the article's published date.")
      .addToggle((val) => val
                 .onChange(async (val) => {
                   console.log(val)
                   this.plugin.settings.publishedDate = val
                   await this.plugin.saveSettings()
                 })
                )

    new Setting(containerEl)
      .setName("Description")
      .setDesc("Fetch the article description.")
      .addToggle((val) => val
                 .onChange(async (val) => {
                   console.log(val)
                   this.plugin.settings.description = val
                   await this.plugin.saveSettings()
                 })
                )

    new Setting(containerEl)
      .setName("Title")
      .setDesc("Fetch the article title.")
      .addToggle((val) => val
                 .onChange(async (val) => {
                   console.log(val)
                   this.plugin.settings.title = val
                   await this.plugin.saveSettings()
                 })
                )

    new Setting(containerEl)
      .setName("Link")
      .setDesc("Fetch the article link.")
      .addToggle((val) => val
                 .onChange(async (val) => {
                   console.log(val)
                   this.plugin.settings.url = val
                   await this.plugin.saveSettings()
                 })
                )
  }
}
