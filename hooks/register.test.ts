import { test, expect } from 'claude-code/testing'

for (const surface of ['terminal', 'desktop'] as const) {
  test(`버튼 누르면 입력창에 채우고 전송하지 않음 (${surface})`, async ($, on) => {
    const fills: string[] = []
    const submits: string[] = []
    on('prompt.fill', (_, e) => {
      fills.push(e.text)
      return { isFilled: true }
    })
    on('prompt.submit', (_, e, next) => {
      submits.push(e.text)
      return next(e)
    })
    const view = await $.ui.mount({ plugin: 'quick-asks', surface, component: 'AbovePrompt', props: { hasSurvey: false } as never })
    await view.press({ key: 'table' })
    expect(fills).toEqual(['이 표 세줄로 요약해줘'])
    expect(submits).toEqual([])
  })
}
