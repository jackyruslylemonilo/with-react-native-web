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

  useEffect(() => {
    async function init() {
      if (userAgent.indexOf('lemonilo/') !== 0) {
        window.location.replace('/');
      } else {
        const [firstSegmentUserAgent] = userAgent.split(';');
        const [
          _appName,
          _platform,
          appBuildVersion,
        ] = firstSegmentUserAgent.split('/');
        const [_appBuildNumber, appVersion] = appBuildVersion?.split(' - ');

        const minVersionApp = transformAppVersionToNumber(minVersion);
        const currentVersion = transformAppVersionToNumber(appVersion.replace('v', ''));

        if (currentVersion < minVersionApp) {
          //'lemonilo://webview?url=https://www.lemonilo.com/p/wiranilo&replace_navigation=1'
          window.location.replace(`${urlPrevVersion}${urlPrevVersion.includes('?') ? '&' : '?'}replace_navigation=1`)
        } else {
          //'lemonilo://landing-page-anniv-game?replace_navigation=1'
          window.location.replace(`${urlCurrentVersion}${urlCurrentVersion.includes('?') ? '&' : '?'}replace_navigation=1`);
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
    window.open(
              'https://play.google.com/store/apps/details?id=com.lemonilo&launch=true');
         
            // window.location.href = 
            //   'https://itunes.apple.com/us/app/lemonilo/id1450623533'
            
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
