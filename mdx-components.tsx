import { type MDXComponents } from 'mdx/types'
import { FinancialIndependenceForm } from '@/components/Form'

export function useMDXComponents(components: MDXComponents) {
  return {
    ...components,
    FinancialIndependenceForm,
  }
}
