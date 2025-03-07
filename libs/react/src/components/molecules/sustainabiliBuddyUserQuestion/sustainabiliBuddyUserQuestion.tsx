import {Markdown} from "@coldpbc/components";


export const SustainabiliBuddyUserQuestion = (
  props : {
    question: string;
  }
) => {
  const {question} = props;
  return (
    <div className={'w-full flex flex-row justify-end'}>
      <div className={'rounded-2xl bg-gray-50 flex flex-col text-tc-primary text-body gap-[10px] p-4 w-4/5'}>
        <Markdown
          markdown={question}
          />
      </div>
    </div>
  )
}
