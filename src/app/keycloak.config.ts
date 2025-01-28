import {
  AutoRefreshTokenService,
  UserActivityService,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  provideKeycloak
} from "keycloak-angular";
import {environment} from "@environments/environment";

export const keycloakProviders = provideKeycloak({
  config: environment.keycloakConfig,
  initOptions: {
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
  },
  providers: [
    AutoRefreshTokenService,
    UserActivityService,
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: environment.keycloakTokenInterceptorConfig.useValue
    }
  ]
});
