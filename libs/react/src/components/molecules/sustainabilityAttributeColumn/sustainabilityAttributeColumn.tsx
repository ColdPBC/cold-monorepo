import {SustainabilityAttributeWithoutAssurances} from "@coldpbc/interfaces";
import {DEFAULT_ICON_URL} from "@coldpbc/components";
import React, { useEffect, useState } from 'react';


export const SustainabilityAttributeColumn = (props: {
  sustainabilityAttribute: SustainabilityAttributeWithoutAssurances | null
}) => {
  const {sustainabilityAttribute} = props;
  const [imgSrc, setImgSrc] = useState<string>(sustainabilityAttribute?.logoUrl || DEFAULT_ICON_URL);

  useEffect(() => {
    setImgSrc(sustainabilityAttribute?.logoUrl || DEFAULT_ICON_URL);
  }, [sustainabilityAttribute]);

  if(!sustainabilityAttribute) {
    return null;
  }

  const { name } = sustainabilityAttribute;

  return (
    <div className="w-full h-full flex flex-row gap-2 items-center">
      <img className="w-[40px] h-[40px] object-cover rounded-[4px]" src={imgSrc}
           alt={`Logo for ${sustainabilityAttribute.name}`} onError={() => setImgSrc(DEFAULT_ICON_URL)}/>
      <div className="w-full truncate">
        <span>
          {name}
        </span>
      </div>
    </div>
  )

}
