import useSWR from "swr";
import {PolicySignedDataType} from "@coldpbc/interfaces";
import {axiosFetcher} from "@coldpbc/fetchers";
import {isAxiosError} from "axios";
import {isEmpty} from "lodash";
import {useAuth0Wrapper, useColdContext} from "@coldpbc/hooks";
import {ErrorPage, SignupPage, Spinner, Takeover} from "@coldpbc/components";
import {ErrorType, GlobalSizes} from "@coldpbc/enums";
import React from "react";
import {Outlet} from "react-router-dom";


export const PolicyInfoChecker = () => {
  const { user, isAuthenticated, orgId } = useAuth0Wrapper();
  const { logError, logBrowser } = useColdContext();
  const signedPolicySWR = useSWR<PolicySignedDataType[], any, any>(user && isAuthenticated ? ['/policies/signed/user', 'GET'] : null, axiosFetcher);

  const needsSignup = () => {
    if (signedPolicySWR.data && !isAxiosError(signedPolicySWR.data)) {
      // check if user has signed both policies
      const tos = signedPolicySWR.data?.some(policy => policy.name === 'tos' && !isEmpty(policy.policy_data));
      const privacy = signedPolicySWR.data?.some(policy => policy.name === 'privacy' && !isEmpty(policy.policy_data));
      return !tos || !privacy || !user?.family_name || !user?.given_name;
    } else {
      return true;
    }
    // todo - put this check back in when we need to check for company
    // check if company is already set
    // if (isUndefined(user?.coldclimate_claims.org_id)) return true;
  };


  if (signedPolicySWR.isLoading) {
    return (
      <Takeover show={true} setShow={() => {}}>
        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <Spinner size={GlobalSizes.xLarge} />
        </div>
      </Takeover>
    );
  }

  if (isAxiosError(signedPolicySWR.data)) {
    let errorMessage;

    if (isAxiosError(signedPolicySWR.data)) {
      logBrowser('Error occurred in PolicyInfoChecker', 'error', { error: signedPolicySWR.error }, signedPolicySWR.error);
      logError(signedPolicySWR.data, ErrorType.SWRError);
      errorMessage = 'A connection error occurred. Please refresh the page or re-login.';
    }

    return <ErrorPage error={errorMessage} showLogout={true} />;
  }

  if (needsSignup()) {
    logBrowser('User needs to sign up', 'info', { user });
    return <SignupPage signedPolicyData={signedPolicySWR.data} userData={user} />;
  }

  logBrowser('User is authenticated', 'info', { user, isAuthenticated, orgId });
  return <Outlet />;
}
