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
  useEffect(() => {
    async function init() {
      if (userAgent.indexOf('lemonilo/') !== 0) {
        window.location.replace('/');
      } else {
        const [firstSegmentUserAgent] = userAgent.split(';');
        const [
          _appName,
          platform,
          appBuildVersion,
        ] = firstSegmentUserAgent.split('/');
        const [_appBuildNumber, appVersion] = appBuildVersion?.split(' - ');

        const minVersion = transformAppVersionToNumber('1.15.0');
        const currentVersion = transformAppVersionToNumber(appVersion);

        if (minVersion < currentVersion) {
          if (platform === 'android') {
            window.location.href =
              'https://play.google.com/store/apps/details?id=com.lemonilo'
            
          } else {
            window.location.href = 
              'https://itunes.apple.com/us/app/lemonilo/id1450623533'
            
          }
        } else {
          window.open('lemonilo://cart');
        }

        console.log(minVersion, currentVersion);
      }
    }

    init();
  }, [userAgent]);

  return <div />;
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
