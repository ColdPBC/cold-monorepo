import {EprSubmissionGraphQL} from "@coldpbc/interfaces";
import {ColdIcon} from "../../atoms";
import {IconNames} from "@coldpbc/enums";
import {format, formatDistance} from "date-fns";
import {HexColors} from "@coldpbc/themes";

const S3_IMAGE_BUCKET = 'https://cold-public-assets.s3.us-east-2.amazonaws.com/epr/'

export const EprProgressStatusBucket = (props: {
  title: string;
  items: EprSubmissionGraphQL[]
}) => {
  const {title, items} = props;

  const getSubmissionDate = (item: EprSubmissionGraphQL) => {
    let text = 'Submitted ';
    if(item.submittedAt) {
      const date = new Date(item.submittedAt);
      const formattedDate = format(date, 'M/d/yy');
      text += `${formattedDate}`;
    }
    return (
      <div className={'text-tc-primary flex flex-row p-1 justify-center rounded-[32px] w-full border-[1px] border-green-200'}>
        <div className={'flex flex-row pr-[12px] pl-[4px]'}>
          <ColdIcon name={IconNames.ColdCheckIcon} className={'w-6 h-6'} color={HexColors.green[200]} />
          <div className={'text-body font-bold'} data-chromatic="ignore">{text}</div>
        </div>
      </div>
    )
  }

  const getDueDate = (item: EprSubmissionGraphQL) => {
    let content = <></>
    if(item.dueDate){
      const formattedDate = format(new Date(item.dueDate), 'MMM dd,yyyy');
      const diff = `Due in ${formatDistance(new Date(item.dueDate), new Date())}`;
      content =
        <>
          <div className={'flex flex-row gap-1 items-center'} data-chromatic="ignore">
            <ColdIcon
              name={IconNames.ColdCalendarEventIcon}
              className={'w-4 h-4'}
              color={'white'}
            />
            <span>
                {formattedDate}
            </span>
          </div>
          <div className={'text-gray-120'}>
            {diff}
          </div>
        </>
    } else {
      content =
        <div>
          To Be Determined
        </div>
    }
    return (
      <div className={'flex flex-row justify-between text-tc-primary text-body w-full'}>
        {content}
      </div>
    )
  }

  const getLogo = (item: EprSubmissionGraphQL) => {
    return S3_IMAGE_BUCKET.concat(item.state).concat('.png')
  }

  return (
    <div className={'w-[456px] min-h-[900px] p-4 rounded-lg bg-gray-20 flex flex-col gap-4 text-tc-primary shrink-0'}>
      <div className={'w-full flex flex-col gap-4'}>
        <div className={'w-full text-h4'}>
          {title}
        </div>
        <div className={'h-[1px] bg-gray-90 w-full'}>
        </div>
      </div>
      {
        items && items.length > 0 ?
          items.map((item, idx) => (
            <div key={idx} className={'w-full h-auto flex flex-col gap-6 p-4 rounded-2xl border-[1px] border-bgc-menu bg-gray-30'}>
              <div className={'w-full flex flex-row bg-gray-40 rounded-lg'}>
                <div className={'w-[96px] h-[96px] shrink-0'}>
                  <img src={getLogo(item)} alt={item.billIdentifier} className={'w-full h-full rounded-l-lg'}/>
                </div>
                <div className={'w-full px-4 py-2 flex flex-col gap-1'}>
                  <div className={'text-h4'}>
                    {item.state}
                  </div>
                  <div className={'text-tc-secondary text-body font-bold'}>
                    {item.billIdentifier}
                  </div>
                  <div className={'text-tc-secondary text-body'}>
                    {item.proName}
                  </div>
                </div>
              </div>
              <div className={'w-full flex flex-row'}>
                {
                  item.status === 'Submitted' ?
                    (
                      getSubmissionDate(item)
                    ) : (
                      getDueDate(item)
                    )
                }
              </div>
            </div>
          )) :
          <div className={'text-tc-disabled text-body'}>
            0 tasks with this status.
          </div>
      }
    </div>
  )
}
