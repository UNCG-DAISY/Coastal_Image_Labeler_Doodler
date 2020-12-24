const protocal = process?.env?.NEXT_PUBLIC_PROTOCOL

const apiCall = (route) => {
  return `${protocal}://${process?.env?.NEXT_PUBLIC_DOMAIN_NAME}${route}`
}

const uiConstants = {
  drawerWidth: 240,
}

const defaultTitle = 'Coastal Image Labeler'

const tabLogoURL =
  'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/water-wave_1f30a.png'

export { protocal, apiCall, uiConstants, defaultTitle, tabLogoURL }
