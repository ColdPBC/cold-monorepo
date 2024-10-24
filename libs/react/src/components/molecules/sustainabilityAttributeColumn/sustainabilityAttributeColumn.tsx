import {SustainabilityAttributeWithoutAssurances} from "@coldpbc/interfaces";
import {DEFAULT_ICON_URL} from "@coldpbc/components";
import React, {useState} from "react";


export const SustainabilityAttributeColumn = (props: {
  sustainabilityAttribute: SustainabilityAttributeWithoutAssurances | null
}) => {
  const {sustainabilityAttribute} = props;
  const [imgSrc, setImgSrc] = useState<string>(sustainabilityAttribute?.logoUrl || DEFAULT_ICON_URL);

  if(!sustainabilityAttribute) {
    return null;
  }

  const { name } = sustainabilityAttribute;

  return (
    <div className="w-full h-full flex flex-row gap-2 items-center">
      <img className="w-[40px] h-[40px] object-cover rounded-lg" src={imgSrc}
           alt={`Logo for ${sustainabilityAttribute.name}`} onError={() => setImgSrc(DEFAULT_ICON_URL)}/>
      <div className="w-full text-tc-secondary truncate">
        <span>
          {name}
        </span>
      </div>
    </div>
  )

}
