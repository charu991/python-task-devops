let BASE_URL = "http://18.218.30.200:4000";
let BASE_URL1 = "http://18.218.30.200:4001";
let BASE_URL2 = "http://18.218.30.200:4003";

if (window.location.protocol === 'https:') {
  BASE_URL = 'https://dev-auth.qvani.com';
  BASE_URL1 = 'https://wallet.qvani.com';
  BASE_URL2 = 'https://offer.qvani.com';
}

// let BASE_URL = 'https://dev-auth.qvani.com';
// let BASE_URL1 = 'https://wallet.qvani.com';
// let BASE_URL2 = 'https://offer.qvani.com';

export const API_URLs = {
  //! Login
  logIn: `${BASE_URL}/user-service-api/v1/auth/login`,
  loginVerify: `${BASE_URL}/user-service-api/v1/auth/verify-otp`,
  forgetPassword: `${BASE_URL}/user-service-api/v1/auth/forgot-password`,
  reset: `${BASE_URL}/user-service-api/v1/auth/reset-password`,

  //! User Management
  getUser: `${BASE_URL}/user-service-api/v1/admin/users`,
  getSingleUser: (userId) =>
    `${BASE_URL}/user-service-api/v1/admin/user/${userId}`,
  userWallet: `${BASE_URL1}/wallet-service/v1/adminCrypto/getuserwallets`,
  getSingleUserWallet: (userId) =>
    `${BASE_URL1}/wallet-service/v1/adminCrypto/getuserwallets/${userId}`,
  getSingleUserParticularWallet: (user, id, status) =>
    `${BASE_URL1}/wallet-service/v1/adminCrypto/getuserwallets/${user}/${id}/${status}`,
  getSingleUserTrade: (userId) =>
    `${BASE_URL2}/offer-service-api/v1/adminOffers/getUserTrades/${userId}`,
  blockUser: (userId, status) => {
    return `${BASE_URL}/user-service-api/v1/admin/user/${userId}/${status}`
  },
  getBlockUserList: `${BASE_URL}/user-service-api/v1/admin/getAllBlockedUsers`,

  //Admin Profile
  getProfile: `${BASE_URL}/user-service-api/v1/admin/profile`,

  //! Wallet Management
  getCryptoWallet: `${BASE_URL1}/wallet-service/v1/adminCrypto/getWallets`,
  getAllWallet: `${BASE_URL1}/wallet-service/v1/adminCrypto/getUserWalletsBalance`,
  getBalance: `${BASE_URL1}/wallet-service/v1/adminCrypto/getBalance`,

  blockCrypto: `${BASE_URL1}/wallet-service/v1/adminCrypto/blockCrypto`,
  unBlockCrypto: `${BASE_URL1}/wallet-service/v1/adminCrypto/unBlockCrypto`,
  //! Transaction Management
  // cryptoTransaction: `${BASE_URL1}/wallet-service/v1/adminCrypto/transaction`,
  cryptoTransaction: `${BASE_URL1}/wallet-service/v1/adminCrypto/getuserstransaction`,
  cryptoTransactionId: (id) =>
    `${BASE_URL1}/wallet-service/v1/adminCrypto/getuserstransaction/${id}`,

  fiatTransaction: `${BASE_URL1}/wallet-service/v1/adminfiatwallet/transactions`,
  fiatTransactionStatus: (id, status) =>
    `${BASE_URL1}/wallet-service/v1/adminfiatwallet/transactions/${id}/${status}`,

  //! Fee Management
  postFee: `${BASE_URL1}/wallet-service/v1/adminFee/`,
  getFee: `${BASE_URL1}/wallet-service/v1/adminFee/`,
  getFeeId: (id) => `${BASE_URL1}/wallet-service/v1/adminFee/fee/${id}`,
  deleteGetFeeId: (id) => `${BASE_URL1}/wallet-service/v1/adminFee/fee/${id}`,
  updateFee: (id) => `${BASE_URL1}/wallet-service/v1/adminFee/fee/${id}`,

  //! Dispute Management
  getDispute: `${BASE_URL1}/wallet-service/v1/admindispute/`,
  getDisputeId: (id) => `${BASE_URL1}/wallet-service/v1/admindispute/${id}`,
  solveDispute: (id, status = "solve") => `${BASE_URL1}/wallet-service/v1/admindispute/${id}/${status}`,

  // trade dispute
  tradeDispute: `${BASE_URL2}/offer-service-api/v1/adminTradeDispute/`,
  tradeDisputeById: (id) => `${BASE_URL2}/offer-service-api/v1/adminTradeDispute/${id}`,
  tradeDisputeResolve: (id) => `${BASE_URL2}/offer-service-api/v1/adminTradeDispute/${id}/solve`,

  //! Kyc Management
  kycList: `${BASE_URL}/user-service-api/v1/admin/kyc/users`,

  //! Currency Management
  getCurrency: `${BASE_URL}/user-service-api/v1/public-users/all-currency`,
  getCurrencyId: (id) =>
    `${BASE_URL}/user-service-api/v1/public-users/all-currency/${id}`,

  //! Country Management
  getCountry: `${BASE_URL}/user-service-api/v1/public-users/all-country`,
  getCountryId: (id) =>
    `${BASE_URL}/user-service-api/v1/public-users/all-country/${id}`,

  //! BlackList
  getAllUserId: `${BASE_URL2}/offer-service-api/v1/adminTrustedUser/getAllUsers`,
  trustUntrust: `${BASE_URL2}/offer-service-api/v1/adminTrustedUser/getAllTrustedUntrustedUsers`,
  //! Trade Management
  getTrade: `${BASE_URL2}/offer-service-api/v1/adminOffers/trade`,
  getTradeId: (id) =>
    `${BASE_URL2}/offer-service-api/v1/adminOffers/tradeById/${id}`,

  changePassword: `${BASE_URL}/user-service-api/v1/admin/changePassword`,

  //feedback
  feedback: `${BASE_URL2}/offer-service-api/v1/adminOffers/getUserFeedback`,
  deletefeedback: (id) => `${BASE_URL2}/offer-service-api/v1/adminOffers/deleteFeedback/${id}`,

  // level
  limitLevel: `${BASE_URL}/user-service-api/v1/admin/levels`,

  // active trade 
  active: `${BASE_URL2}/offer-service-api/v1/adminOffers/activeTrades`,
  getChat: `${BASE_URL2}/offer-service-api/v1/userchat/getChatByAdmin`,

  // blockcountry
  blockCountry: (id) => `${BASE_URL}/user-service-api/v1/admin/countryBlock/${id}`,
  getBlockedCountry: `${BASE_URL}/user-service-api/v1/admin/BlockCountries`,
  adminAddChat: `${BASE_URL2}/offer-service-api/v1/userchat/addChatforAdmin`,

  // withdrawal management
  getWithdrawalAmount: `${BASE_URL1}/wallet-service/v1/adminFee/withdrawlAmount`,
  editWithdrawalAmount: `${BASE_URL1}/wallet-service/v1/adminFee/withdrawlAmount`,
  getWithdrawalList: `${BASE_URL1}/wallet-service/v1/withdrawl/getWithdrawlRequestList`,
  approved: (id) => `${BASE_URL1}/wallet-service/v1/withdrawl/withdrawlRequestStatusChange/${id}`,

  // sumsub
  allApplicant: `${BASE_URL}/user-service-api/v1/sumsub/getAllSumsubApplicants`,

  //internel fee api
  internalFeeList: `${BASE_URL1}/wallet-service/v1/adminFee/internalTrnsaferFee`,
  //external fee API
  externalFeeList: `${BASE_URL1}/wallet-service/v1/adminFee/withdrawlFee`,
  // payment method fe API 
  paymentMethodFeeList: `${BASE_URL1}/wallet-service/v1/adminFee/tradePaymentFee`,

  // conversion api 
  convertcryptoToFiat: (from, amount, to) => `${BASE_URL1}/wallet-service/v1/conversion?from=${from}&amount=${amount}&target=${to}`,

  //min trade limit
  minTradeLim: `${BASE_URL2}/offer-service-api/v1/offers/minOfferAmounts`,
  minTradeLimitGet: `${BASE_URL2}/offer-service-api/v1/offers/minOfferAmountsForAdmin`,
};
