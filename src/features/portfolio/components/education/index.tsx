import {
  Panel,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel"

import { EDUCATION } from "@/features/portfolio/data/education"
import type { Education } from "@/features/portfolio/types/education"

import { EducationItem } from "./education-item"

const ID = "education"

export function Education() {
  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle><a href={`#${ID}`}>Education</a></PanelTitle>
      </PanelHeader>

      {EDUCATION.map((item) => (
        <div
          key={item.id}
          id={`education-${item.id}`}
          className="screen-line-bottom scroll-mt-14 p-4"
        >
          <EducationItem key={item.id} item={item} />
        </div>
      ))}
    </Panel>
  )
}
