import ApplicantsSearch from '@/components/web/applicants-search'
import ApplicantsList from '@/components/web/applicants-list'
import ListItem from '@/components/web/list-item'
import ItemCell from '@/components/web/item-cell'

customElements.define('applicants-search', ApplicantsSearch, { extends: 'form' })
customElements.define('applicants-list', ApplicantsList, { extends: 'ul' })
customElements.define('list-item', ListItem, { extends: 'li' })
customElements.define('item-cell', ItemCell, { extends: 'div' })
