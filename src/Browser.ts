import Bowser from 'bowser';

export default class {

  /**
   * Returns browser information
   */
  public static parse(ua: string): { platform: string,　osName: string,　osVersion: number|null,　browserName: string} {
    const parser = Bowser.getParser(ua);
    const platform = parser.getPlatformType();
    const browserName = parser.getBrowserName();
    let osName = parser.getOSName();
    let osVersion: string|number|null = parser.getOSVersion();
    const matched = osVersion.match(/^([A-Za-z]+)\s+([\d.]+)$/);
    if (matched) {
      osName += ` ${matched[1]}`;
      osVersion = matched[2];
    }
    osVersion = <number>parseFloat(osVersion);
    if(isNaN(osVersion)) osVersion = null;
    return {
      platform,
      osName,
      osVersion,
      browserName
    };
  }
}
