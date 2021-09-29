import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';

const transformAppVersionToNumber = (version) => {
  const appVersion = version.toString().split('.');

  const baseMultipler = 100;
  let multiplier = Math.pow(baseMultipler, appVersion.length);
  let versionInNumber = 0;

  appVersion.forEach((item) => {
    versionInNumber += parseInt(item) * multiplier;
    multiplier /= baseMultipler;
  });

  return versionInNumber;
};

const AnniversaryGamePage = ({ userAgent }) => {
  const router = useRouter();
  const { query } = router;
  const { minVersion, urlPrevVersion, urlCurrentVersion } = query;
  const [firstSegmentUserAgent] = userAgent.split(';');
  const [
    _appName,
    _platform,
    appBuildVersion,
  ] = firstSegmentUserAgent.split('/');
  const [_appBuildNumber, appVersion] = appBuildVersion?.split(' - ');

  useEffect(() => {
    async function init() {
      if (userAgent.indexOf('lemonilo/') !== 0) {
        window.location.replace('/');
      } else {
        

        const minVersionApp = transformAppVersionToNumber(minVersion);
        const currentVersion = transformAppVersionToNumber(appVersion.replace('v', ''));

        if (_platform === 'ios') {
          return window.open('lemonilo://webview?url=https://www.lemonilo.com/p/wiranilo&replace_navigation=1');
        }

        if (currentVersion < minVersionApp) {
          //'lemonilo://webview?url=https://www.lemonilo.com/p/wiranilo&replace_navigation=1'
          if (_platform === 'ios') {
            window.location.replace('lemonilo://webview?url=https://www.lemonilo.com/p/wiranilo&replace_navigation=1');
          } else {
            window.location.replace(`${urlPrevVersion}${urlPrevVersion.includes('?') ? '&' : '?'}replace_navigation=1`)
          }
        } else {
          //'lemonilo://landing-page-anniv-game?replace_navigation=1'
          if (_platform === 'ios') {
            window.location.replace('lemonilo://cart?replace_navigation=1');
          } else {
            window.location.replace(`${urlCurrentVersion}${urlCurrentVersion.includes('?') ? '&' : '?'}replace_navigation=1`);
          }
        }
      }
    }

    init();
  }, [userAgent, query]);

  return <div>{userAgent} v1.5.7

{minVersion}<br />
{decodeURIComponent(urlPrevVersion)} <br />
{decodeURIComponent(urlCurrentVersion)}

  <button onClick={() => {
    if (_platform === 'android') {
    window.open(
              'market://details?id=com.lemonilo');
    } else {
      window.open('https://apps.apple.com/us/app/lemonilo-healthy-living/id1450623533')
      // window.open('itms-apps://itunes.apple.com/lemonilo-healthy-living/id1450623533')
    }
            
  }}>Update</button>
</div>;
};

AnniversaryGamePage.getInitialProps = async (ctx) => {
  let userAgent = '';

  if (ctx.req) {
    userAgent = ctx.req.headers['user-agent'] ?? '';

    if (ctx.res) {
      ctx.res.statusCode = 404;
    }
  }

  return {
    userAgent,
  };
};

export default AnniversaryGamePage;
