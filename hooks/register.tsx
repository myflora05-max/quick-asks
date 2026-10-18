import type { Register } from 'claude-code'

export const ASKS = [
  { key: 'today', label: '오늘 할 일 정리', text: '오늘 할 일 정리해줘' },
  { key: 'table', label: '이 표 세줄 요약', text: '이 표 세줄로 요약해줘' },
  { key: 'reply', label: '답장 초안', text: '이 메일 답장 초안 써줘' },
] as const

export const register: Register = on => {
  on('ui.render', { component: 'AbovePrompt' }, ($, e, next) => {
    if (e.props.hasSurvey) {
      return next(e)
    }

    const { Box, Button } = $.ui.resolve(e)

    return (
      <Box>
        {ASKS.map(ask => (
          <Button
            key={ask.key}
            label={ask.label}
            onPress={() => $.prompt.fill({ text: ask.text, mode: 'replace' })}
          />
        ))}
      </Box>
    )
  })
}
