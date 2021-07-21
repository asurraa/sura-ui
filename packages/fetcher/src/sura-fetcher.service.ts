/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosInstance } from "axios";
import type { GetOneInputInterface, HttpPath, HttpResponse } from "./types";
import { queryParamFunc } from "./hooks";
import type {
  CreateInterface,
  DeleteInterface,
  GetAllQueryParamInterface,
  GetAllResponseInterface,
  GetOneInterface,
  GetOneResponseInterface,
  UpdateInterface,
  TheUseQueryInstance,
} from "./types";

export interface MetaSuraPagination {}

export class HttpServiceWrapperFactory<D, R> {
  private path: HttpPath;
  private getAllUrl: string;
  private theAxiosInstance: AxiosInstance;
  private useQueryInstance: TheUseQueryInstance;
  private queryParm: queryParamFunc;

  constructor(
    path: HttpPath,
    axios: AxiosInstance,
    useQueryInstance: TheUseQueryInstance,
    queryParm: queryParamFunc
  ) {
    this.path = path;
    this.getAllUrl = queryParm({ url: path.GET_ALL });
    this.theAxiosInstance = axios;
    this.useQueryInstance = useQueryInstance;
    this.queryParm = queryParm;
  }

  getAll = ({ page, limit, search, param }: GetAllQueryParamInterface) => {
    this.getAllUrl = this.queryParm({
      url: this.path.GET_ALL,
      page,
      limit,
      search,
      param,
    });
    const {
      data: response,
      error,
      isLoading,
      refetch,
      ...rest
    } = this.useQueryInstance<
      GetAllResponseInterface<R, MetaSuraPagination>,
      any
    >(this.getAllUrl);
    const meta = response?.meta;
    const data: Array<R> | [] = response?.data ?? [];

    return {
      meta,
      data,
      error,
      isLoading,
      refresh: refetch,
      url: this.getAllUrl,
      ...rest,
    };
  };

  getOne = ({ id }: GetOneInterface) => {
    const {
      data: response,
      error,
      isLoading,
      refetch,
      ...rest
    } = this.useQueryInstance<GetOneResponseInterface<R>, any>(
      `${this.path.GET_ONE}/${id}`
    );
    const data: R | undefined = response?.data;

    return {
      data,
      error,
      isLoading,
      refresh: refetch,
      url: this.getAllUrl,
      ...rest,
    };
  };

  updateOne = async <D>({
    data,
    currentPage,
    id,
  }: UpdateInterface<D>): Promise<HttpResponse<D>> => {
    try {
      const res = await this.theAxiosInstance.patch(
        `${this.path.UPDATE}/${id}`,
        data
      );
      const getAllUrl = this.queryParm({
        url: this.path.GET_ALL,
        page: currentPage,
      });
      return { data: res.data, getAllUrl };
    } catch (ex) {
      return { error: ex };
    }
  };

  createOne = async <D>({
    data,
    currentPage,
  }: CreateInterface<D>): Promise<HttpResponse<D>> => {
    try {
      if (!this.path.CREATE) {
        throw "Path not provided";
      }
      const res = await this.theAxiosInstance.post(this.path.CREATE, data);
      const getAllUrl = this.queryParm({
        url: this.path.GET_ALL,
        page: currentPage,
      });
      return { data: res.data, getAllUrl };
    } catch (ex) {
      return { error: ex };
    }
  };

  deleteOne = async ({
    id,
    currentPage,
  }: DeleteInterface): Promise<HttpResponse<D>> => {
    try {
      const res = await this.theAxiosInstance.delete(
        `${this.path.DELETE}/${id}`
      );
      const getAllUrl = this.queryParm({
        url: this.path.GET_ALL,
        page: currentPage,
      });
      return { data: res.data, getAllUrl };
    } catch (ex) {
      return { error: ex };
    }
  };

  // * Promise
  getAllPromise = async () => {
    try {
      const res = await this.theAxiosInstance.get<R[]>(`${this.path.GET_ALL}`);
      return { data: res.data };
    } catch (ex) {
      return { error: ex };
    }
  };

  getOnePromise = async ({ id }: GetOneInputInterface) => {
    try {
      const res = await this.theAxiosInstance.get<R>(
        `${this.path.GET_ONE}/${id}`
      );
      return { data: res.data };
    } catch (ex) {
      return { error: ex };
    }
  };
}
