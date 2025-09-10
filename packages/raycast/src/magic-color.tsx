import { Action, ActionPanel, environment, List, open } from '@raycast/api'
import { useState } from 'react'

const items = [
  {
    label: '颜色转化',
    value: '/color-transform',
  },
  {
    label: '对比度',
    value: '/color-match',
  },
  {
    label: '配色方案',
    value: '/color-themes',
  },
  {
    label: '预设主题',
    value: '/preset-themes',
  },
]

export default async function Command() {
  const [searchText, setSearchText] = useState('')

  const openUrl = async (url: string) => {
    const baseUrl = environment.isDevelopment ? 'http://localhost:5173' : 'https://magicolor.zm8.dev'
    await open(`${baseUrl}${url}?color=${searchText}`, '_blank')
  }

  return (
    <List
      searchText={searchText}
      searchBarPlaceholder="Input your color"
      onSearchTextChange={setSearchText}
      isShowingDetail={false}
      filtering={false}
    >
      {items.map(item => (
        <List.Item
          key={item.value}
          title={item.label}
          accessories={[{ text: item.value }]}
          actions={(
            <ActionPanel>
              <Action title="Select" onAction={() => openUrl(item.value)} />
            </ActionPanel>
          )}
        />
      ))}
    </List>
  )
}
