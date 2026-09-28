import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel"

export function Blog() {
  return (
    <Panel className="screen-line-top-border">
      <PanelHeader>
        <PanelTitle>Blog</PanelTitle>
      </PanelHeader>

      <PanelContent className="flex flex-col">
        <p className="text-muted-foreground p-4">Writing coming soon...</p>
      </PanelContent>
    </Panel>
  )
}
