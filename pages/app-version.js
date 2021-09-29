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
        const currentVersion = transformAppVersionToNumber(appVersion.replace('v', ''));

        if (currentVersion < minVersion) {
          window.location.replace('https://www.lemonilo.com/p/wiranilo')
        } else {
          window.location.replace('lemonilo://cart')
        }
      }
    }

    init();
  }, [userAgent]);

  return <div>{userAgent} v1.5.1
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
