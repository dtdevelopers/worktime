import { PageOptionsDTO } from 'src/interfaces/pagination.dto';
import { PageDTO } from '../interfaces/page.dto';

export class PaginationUtil {
  public static generatePaginationHttpHeaders(
    page: PageDTO<any>,
    response: any,
  ): void {
    response.set({
      'Access-Control-Expose-Headers': '*',
      'X-Total-Count': page.total,
    });
  }

  public static generatePagination(pageable: PageOptionsDTO): {
    skip: number;
    take: number;
  } {
    return {
      skip: pageable.page * pageable.size || null,
      take: pageable.size || null,
    };
  }
}
