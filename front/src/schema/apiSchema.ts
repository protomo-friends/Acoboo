/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Category {
  /**
   * @format int64
   * @example 1
   */
  id?: number;
  /** @example "食費" */
  name?: string;
}

export interface Category1 {
  /**
   * @format int64
   * @example 2
   */
  id?: number;
  /** @example "交際費" */
  name?: string;
}

export interface Category2 {
  /**
   * @format int64
   * @example 3
   */
  id?: number;
  /** @example "交通費" */
  name?: string;
}

export type Categories = (Category1 | Category2)[];

export interface Account {
  /**
   * @format int64
   * @example 1
   */
  id?: number;
  /** @example "テスト銀行" */
  name?: string;
}

export interface MonetaryEvent {
  /**
   * @format int64
   * @example 10
   */
  id?: number;
  /** @example "スーパーで買い物" */
  name: string;
  /** 収入/支出 */
  eventType: "income" | "expense";
  category?: Category;
  account?: Account;
}

export type MonetaryEvents = (MonetaryEvent1 | MonetaryEvent2)[];

export interface MonetaryEvent1 {
  /**
   * @format int64
   * @example 11
   */
  id?: number;
  /** @example "レストランで食事" */
  name: string;
  /** 収入/支出 */
  eventType: "income" | "expense";
  category?: Category;
  account?: Account;
}

export interface MonetaryEvent2 {
  /**
   * @format int64
   * @example 12
   */
  id?: number;
  /** @example "コンビニで買い物" */
  name: string;
  /** 収入/支出 */
  eventType: "income" | "expense";
  category?: Category;
  account?: Account;
}

export interface ApiResponse {
  /** @format int32 */
  code?: number;
  type?: string;
  message?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://acoboo.swagger.io/api/v1";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Acoboo API - OpenAPI 3.0
 * @version 1.0.0
 * @baseUrl https://acoboo.swagger.io/api/v1
 * @externalDocs http://swagger.io
 *
 * 家計簿アプリケーションAcobooのAPIドキュメントです。
 * Powered by takashi@misskey.systems
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  monetaryEvents = {
    /**
     * @description 新しい収入/支出を登録します
     *
     * @tags monetary events
     * @name AddMonetaryEvent
     * @summary 新しい収入/支出を登録します
     * @request POST:/monetary-events
     */
    addMonetaryEvent: (data: MonetaryEvent, params: RequestParams = {}) =>
      this.request<MonetaryEvent, void>({
        path: `/monetary-events`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 収入/支出の一覧を取得します
     *
     * @tags monetary events
     * @name GetMonetaryEvents
     * @summary 収入/支出の一覧を取得します
     * @request GET:/monetary-events
     */
    getMonetaryEvents: (params: RequestParams = {}) =>
      this.request<MonetaryEvents, void>({
        path: `/monetary-events`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a single monetary event
     *
     * @tags monetary events
     * @name GetMonetaryEventById
     * @summary Find monetary event by ID
     * @request GET:/monetary-events/{id}
     */
    getMonetaryEventById: (id: number, params: RequestParams = {}) =>
      this.request<MonetaryEvent, void>({
        path: `/monetary-events/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags monetary events
     * @name UpdateMonetaryEvent
     * @summary Updates a monetary events in the store with form data
     * @request POST:/monetary-events/{id}
     */
    updateMonetaryEvent: (
      id: number,
      query?: {
        /** Name of monetary event that needs to be updated */
        name?: string;
        /** Status of monetary event that needs to be updated */
        status?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/monetary-events/${id}`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * @description delete a monetary event
     *
     * @tags monetary events
     * @name DeletemonetaryEvent
     * @summary Deletes a monetary event
     * @request DELETE:/monetary-events/{id}
     */
    deletemonetaryEvent: (id: number, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/monetary-events/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
  accounts = {
    /**
     * @description 新しい口座を登録します
     *
     * @tags accounts
     * @name AddAccount
     * @summary 新しい口座を登録します
     * @request POST:/accounts
     */
    addAccount: (data: Account, params: RequestParams = {}) =>
      this.request<Account, void>({
        path: `/accounts`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 口座の一覧を取得します
     *
     * @tags accounts
     * @name GetAccounts
     * @summary 口座の一覧を取得します
     * @request GET:/accounts
     */
    getAccounts: (params: RequestParams = {}) =>
      this.request<Account, void>({
        path: `/accounts`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a single account
     *
     * @tags accounts
     * @name GetAccountById
     * @summary Find account by ID
     * @request GET:/accounts/{id}
     */
    getAccountById: (id: number, params: RequestParams = {}) =>
      this.request<MonetaryEvent, void>({
        path: `/accounts/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags accounts
     * @name UpdateAccount
     * @summary Updates a accounts in the store with form data
     * @request POST:/accounts/{id}
     */
    updateAccount: (
      id: number,
      query?: {
        /** Name of account that needs to be updated */
        name?: string;
        /** Status of account that needs to be updated */
        status?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/accounts/${id}`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * @description delete a account
     *
     * @tags accounts
     * @name DeleteAccount
     * @summary Deletes a account
     * @request DELETE:/accounts/{id}
     */
    deleteAccount: (id: number, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/accounts/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
  categories = {
    /**
     * @description 新しいカテゴリーを登録します
     *
     * @tags categories
     * @name AddCategory
     * @summary 新しいカテゴリーを登録します
     * @request POST:/categories
     */
    addCategory: (data: Category, params: RequestParams = {}) =>
      this.request<Category, void>({
        path: `/categories`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description カテゴリーの一覧を取得します
     *
     * @tags categories
     * @name GetCategories
     * @summary カテゴリーの一覧を取得します
     * @request GET:/categories
     */
    getCategories: (params: RequestParams = {}) =>
      this.request<Categories, void>({
        path: `/categories`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a single cateogry
     *
     * @tags categories
     * @name GetEventById
     * @summary Find cateogry by ID
     * @request GET:/categories/{id}
     */
    getEventById: (id: number, params: RequestParams = {}) =>
      this.request<Category, void>({
        path: `/categories/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags categories
     * @name UpdateCategory
     * @summary Updates a category in the store with form data
     * @request POST:/categories/{id}
     */
    updateCategory: (
      id: number,
      query?: {
        /** Name of category that needs to be updated */
        name?: string;
        /** Status of category that needs to be updated */
        status?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/categories/${id}`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * @description delete a category
     *
     * @tags categories
     * @name DeleteEvent
     * @summary Deletes a category
     * @request DELETE:/categories/{id}
     */
    deleteEvent: (id: number, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/categories/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
}
