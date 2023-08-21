import _metascraper from 'metascraper'
import author from 'metascraper-author'
import date from 'metascraper-date'
import description from 'metascraper-description'
import title from 'metascraper-title'
import url from 'metascraper-url'
import image from 'metascraper-image'
import language from 'metascraper-lang'
import logo from 'metascraper-logo'
import publisher from 'metascraper-publisher'
import feed from 'metascraper-feed'
import favicon from 'metascraper-logo-favicon'
import type { ArticleScraperSettingsType } from './Settings'

export default class MetaScraper {
  private _fields: ArticleScraperSettingsType

  constructor({ fields }: { fields: ArticleScraperSettingsType }) {
    this._fields = fields
  }

  get scraper() {
    return _metascraper([
      ...this._fieldScrapers()
    ])
  }

  private _fieldScrapers() {
    const _fieldScrapers = {
      author,
      publishedDate: date,
      description,
      title,
      link: url,
      image,
      language,
      logo,
      publisher,
      feed,
      favicon,
    }
    
    // return only field scrapers that are enabled in plugin settings 
    return Object.keys(_fieldScrapers)
      .filter((field: keyof ArticleScraperSettingsType) => this._fields[field])
      .map((field: keyof typeof _fieldScrapers) => _fieldScrapers[field]())
  }
}
