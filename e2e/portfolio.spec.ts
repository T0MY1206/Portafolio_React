import { expect, test } from '@playwright/test'

test('navegacion principal y controles de mascota', async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem('mascot_visible', 'true')
    window.localStorage.setItem('mascot_mode', 'interactive')
  })

  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1, name: 'Tomas Tutor Onetto' })).toBeVisible()

  await page.getByRole('navigation').getByRole('link', { name: 'Contact' }).click()
  await expect(page.getByRole('heading', { name: 'Contact' })).toBeVisible()

  await page.getByTestId('mascot-settings-toggle').click()
  await expect(page.getByTestId('mascot-settings')).toBeVisible()

  await page.locator('.mascot-settings select').first().selectOption('assistant')
  await expect(page.getByText('Assistant mode shares contextual tips without moving the UI.')).toBeVisible()

  await page.getByTestId('mascot-close').click()
  await expect(page.getByTestId('mascot-reopen')).toBeVisible()
  await page.getByTestId('mascot-reopen').click()
  await expect(page.getByTestId('mascot-settings-toggle')).toBeVisible()
})
