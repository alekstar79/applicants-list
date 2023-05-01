import { onMounted } from "vue"

export function useSelect(dropDownList, dropDownBtn)
{
  const toggleDropDown = () => {
    dropDownList.value?.classList.toggle('dropdown__list--visible')
    dropDownBtn.value?.classList.toggle('dropdown__button--active')
  }

  const closeDropDown = () => {
    dropDownList.value?.classList.remove('dropdown__list--visible')
    dropDownBtn.value?.classList.remove('dropdown__button--active')
  }

  onMounted(() => {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeDropDown()
    })
    document.addEventListener('click', e => {
      if (e.target !== dropDownBtn.value) closeDropDown()
    })
  })

  return {
    toggleDropDown,
    closeDropDown
  }
}
