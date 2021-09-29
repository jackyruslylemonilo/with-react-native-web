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
        fetch('https://staging-api-rnd.lemonilo.com/v1/config/app-version-checker')
          .then(response => {
            const data = JSON.parse(response.data.value);
            const { minVersion, urlCurrentVersion, urlPrevVersion } = data;

            const minVersionApp = transformAppVersionToNumber(minVersion);
            const currentVersion = transformAppVersionToNumber(appVersion.replace('v', ''));
    
            if (currentVersion < minVersionApp) {
              window.location.replace(urlPrevVersion)
            } else {
              window.location.replace(urlCurrentVersion);
            }
          });
      }
    }

    init();
  }, [userAgent, query]);

  return <div>{userAgent} v1.5.7
<br />
{appVersion}<br />
{/* {decodeURIComponent(urlPrevVersion)} <br />
{decodeURIComponent(urlCurrentVersion)} */}

  <button onClick={() => {
    if (_platform === 'android') {
    window.open(
              'market://details?id=com.lemonilo');
    } else {
      window.open('https://apps.apple.com/us/app/lemonilo-healthy-living/id1450623533')
      // window.open('itms-apps://itunes.apple.com/lemonilo-healthy-living/id1450623533')
    }
            
  }}>Update</button>

  <button onClick={() => {
    window.open('lemonilo://cart');
  }}>
    Cart
  </button>
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
