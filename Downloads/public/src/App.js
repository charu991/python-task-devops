import "react-toastify/dist/ReactToastify.css";
import React, { lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";
import LayoutMain from "./component/Layout/LayoutMain";
import LayoutDashboard from "./component/Layout/LayoutDashboard"
import { ToastContainer } from "react-toastify"

const AuthContext = lazy(() => import("./context/AuthContext"));
const Login = lazy(() => import("./pages/Auth/Login/Login"));
const LoginOtp = lazy(() => import('./pages/Auth/Login/LoginOtp'));
const Forgot = lazy(() => import("./pages/Auth/Forgot/Forgot"));
const ResetPassword = lazy(() => import("./pages/Auth/ResetPassword/ResetPassword"));
const WithdrawalManagement = lazy(() => import("./pages/WithdrawalManagement/WithdrawalManagement"));
const AddWithdrawl = lazy(() => import('./pages/AddWithdrawl/Index'))
const UserManagement = lazy(() => import("./pages/UserManagement/UserManagement"));
const SingleUser = lazy(() => import("./pages/UserManagement/SingleUser"));
const Dashboard = lazy(() => import('./pages/Dashboard/Index'))
const WalletManagement = lazy(() => import("./pages/WalletManagement/WalletManagement"));
const FeeManagement = lazy(() => import("./pages/FeeManagement/FeeManagement"));
const KycManagement = lazy(() => import("./pages/KycManagement/KycManagement"));
const TransactionManagement = lazy(() => import("./pages/TransactionManagement/TransactionManagement"));
const TradeManagement = lazy(() => import("./pages/TradeManagement/TradeManagement"));
const DisputeManagement = lazy(() => import("./pages/DisputeManagement/DisputeManagement"));
const RoleManagement = lazy(() => import("./pages/RoleManagement/RoleManagement"));
const ReferralManagement = lazy(() => import("./pages/ReferralManagement/ReferralManagement"));
const SingleTrade = lazy(() => import("./pages/TradeManagement/SingleTrade"));
const SingleDisputeGlobal = lazy(() => import("./pages/DisputeManagement/SingleDisputeGlobal"));
const SingleDisputeTrade = lazy(() => import("./pages/DisputeManagement/SingleDisputeTrade"));
const SingleFee = lazy(() => import("./pages/FeeManagement/SingleFee"));
const AddRole = lazy(() => import("./pages/RoleManagement/AddRole"));
const ReferralTransactionHistory = lazy(() => import("./pages/ReferralManagement/ReferralTransactionHistory"));
const UserRefTransHistory = lazy(() => import("./pages/ReferralManagement/UserRefTransHistory"));
const AddReferral = lazy(() => import("./pages/ReferralManagement/AddReferral"));
const NotFound = lazy(() => import("./component/NotFound/NotFound"));
const CurrencyManagement = lazy(() => import("./pages/CurrencyManagement/CurrencyManagement"))
const CountryManagement = lazy(() => import("./pages/CountryManagement/CountryManagement"))
const BlackList = lazy(() => import("./pages/BlackList/BlackList"))
const SingleCurrency = lazy(() => import("./pages/CurrencyManagement/SingleCurrency"))
const SingleBlackList = lazy(() => import("./pages/BlackList/SingleBlackList"))
const Setting = lazy(() => import('./pages/Settings/Index'))
const Feedbackmanagement = lazy(() => import("./pages/FeedbackManagement/Feedbackmanagement"))
const AddLimit = lazy(() => import('./pages/LimitsManagement/Addlimit'))
const Limitmanagement = lazy(() => import('./pages/LimitsManagement/Limitmanagement'))
const ActiveTrade = lazy(() => import('./pages/ActiveTradeManagement/index'))
const Chats = lazy(() => import('./pages/ActiveTradeManagement/Chat'))

const App = () => {
  return (
    <ProSidebarProvider>
      <AuthContext>
        <Routes>
          <Route path='' element={<Navigate to='/login' />} />
          <Route path="login" element={<Login />} />
          <Route path="login/otp" element={<LoginOtp />} />
          <Route path="*" element={<NotFound />} />
          <Route path="forgot" element={<Forgot />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="/" element={<LayoutMain />}>
            <Route path="/" element={<LayoutDashboard />}>
              <Route path="/usermanagement" element={<UserManagement />} />
              <Route path="/usermanagement/:id" element={<SingleUser />} />
              <Route path="/walletmanagement" element={<WalletManagement />} />
              <Route path="/withdrawalmanagement" element={<WithdrawalManagement />} />
              <Route path="/addwithdrawl" element={<AddWithdrawl />} />
              <Route path="/transactionmanagement" element={<TransactionManagement />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/limits' element={<Limitmanagement />} />
              <Route path="/kycmanagement" element={<KycManagement />} />
              <Route path="/feemanagement" element={<FeeManagement />} />
              <Route path="/feemanagement/fee/:id" element={<SingleFee />} />
              <Route path="/trademanagement" element={<TradeManagement />} />
              <Route path="/trademanagement/:id" element={<SingleTrade />} />
              <Route path='/feedbackmanagement' element={<Feedbackmanagement />} />
              <Route path='/settings' element={<Setting />} />
              <Route path='/addlimit' element={<AddLimit />} />
              <Route path='/addlimit/:id' element={<AddLimit />} />
              <Route path="/disputemanagement" element={<DisputeManagement />} />
              <Route path="/single-global-dispute/:id" element={<SingleDisputeGlobal />} />
              <Route path="/single-trade-dispute/:id" element={<SingleDisputeTrade />} />
              <Route path="/rolemanagement" element={<RoleManagement />} />
              <Route path="/addrole" element={<AddRole />} />
              <Route path="/referralmanagement" element={<ReferralManagement />} />
              <Route path="/referralTransactionHistory" element={<ReferralTransactionHistory />} />
              <Route path="/referralTransactionHistory/:id" element={<UserRefTransHistory />} />
              <Route path="/addReferral" element={<AddReferral />} />
              <Route path="/currencymanagement" element={<CurrencyManagement />} />
              <Route path="/currencymanagement/:id" element={<SingleCurrency />} />
              <Route path="/countrymanagement" element={<CountryManagement />} />
              {/* <Route path="/countrymanagement/:id" element={<SingleCountry />} /> */}
              <Route path="/blacklistmanagement" element={<BlackList />} />
              <Route path="/blacklistmanagement/:id" element={<SingleBlackList />} />
              <Route path='/activetrademanagement' element={<ActiveTrade />} />
              <Route path='/chats/:offerId/:tradeId' element={<Chats />} />
            </Route>
          </Route>
        </Routes>
        <ToastContainer autoClose={false} />
      </AuthContext>
    </ProSidebarProvider>
  );
};

export default App;
