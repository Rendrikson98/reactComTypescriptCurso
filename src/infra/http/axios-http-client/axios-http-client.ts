import { HttpPostParams } from "@/data/Protocols/http";
import axios from 'axios';
export class AxiosHttpClient {
  async post(params: HttpPostParams<any>): Promise<void> {
    await axios(params.url)
  }
}