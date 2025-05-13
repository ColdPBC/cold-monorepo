import {Injectable} from '@nestjs/common';
import {BaseWorker, IRequest, PrismaService} from "@coldpbc/nest";
import {CreateEprSubmissionDto} from "./dto/create-epr-submission.dto";

@Injectable()
export class EprSubmissionsService extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
    super(EprSubmissionsService.name);
  }

  async create(req: IRequest, createEprSubmissionDto: CreateEprSubmissionDto) {
    return this.prisma.epr_submissions.create({
      data: {
        ...createEprSubmissionDto,
        organization_id: req.organization.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    });
  }

  /**
   * Get all EPR submissions for the organization
   */
  async findAll(req: IRequest) {
    return this.prisma.epr_submissions.findMany({
      where: {
        organization_id: req.organization.id,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

}
