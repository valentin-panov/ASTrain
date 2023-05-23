import { BaseService, InternalPages } from "@services/index";

export default class AccountSummaryService extends BaseService {
  constructor() {
    super("accountsummary", InternalPages.AccountSummaryPage.path);
  }
}
