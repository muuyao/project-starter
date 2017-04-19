import url from '@/libs/utils/url';

const getRedirectUrl = route => {
  const redirectUrl = url.getParams('redirectUrl') || route.query.redirectUrl;
  return redirectUrl;
}

export default getRedirectUrl;
