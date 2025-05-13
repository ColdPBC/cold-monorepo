import {Body, Controller, Get, HttpStatus, Post, Req, UseFilters, UseGuards} from '@nestjs/common';
import {Span} from "nestjs-ddtrace";
import {BaseWorker, HttpExceptionFilter, IRequest, JwtAuthGuard, RolesGuard} from "@coldpbc/nest";
import {ApiBody, ApiOAuth2, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {EprSubmissionsService} from "./epr_submissions.service";
import {CreateEprSubmissionDto} from "./dto/create-epr-submission.dto";

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiOAuth2(['openid'])
@ApiTags('EPR Submissions')
@UseFilters(new HttpExceptionFilter(EprSubmissionsController.name))
@Controller('organizations/:orgId/epr-submissions')
export class EprSubmissionsController extends BaseWorker{
  constructor(private readonly eprSubmissions: EprSubmissionsService) {
    super(EprSubmissionsController.name);
  }

  @Get()
  @ApiOperation({ summary: 'Get all EPR submissions for an organization' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The EPR submissions have been successfully retrieved',
  })
  async findAll(@Req() req: IRequest) {
    this.logger.log('Retrieving all EPR submissions');
    return this.eprSubmissions.findAll(req);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new EPR submission' })
  @ApiBody({ description: 'EPR submission data' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The EPR submission has been successfully created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid submission data provided',
  })
  async create(@Req() req: IRequest, @Body() createEprSubmissionDto: CreateEprSubmissionDto) {
    this.logger.log('Creating new EPR submission');
    return this.eprSubmissions.create(req, createEprSubmissionDto);
  }

}
