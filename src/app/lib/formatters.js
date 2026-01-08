/**
 * Format price with currency
 * @param {string|number} amount - The price amount
 * @param {string} currencyCode - Currency code (e.g., 'USD', 'EUR')
 * @returns {string} Formatted price string
 */
export function formatPrice(amount, currencyCode = 'USD') {
    const numericAmount =
        typeof amount === 'string' ? parseFloat(amount) : amount

    if (isNaN(numericAmount)) {
        return '$0.00'
    }

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
    }).format(numericAmount)
}

/**
 * Format date to readable string
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export function formatDate(dateString) {
    if (!dateString) return ''

    const date = new Date(dateString)

    if (isNaN(date.getTime())) {
        return ''
    }

    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date)
}

/**
 * Format date to short format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string (e.g., "Jan 8, 2026")
 */
export function formatDateShort(dateString) {
    if (!dateString) return ''

    const date = new Date(dateString)

    if (isNaN(date.getTime())) {
        return ''
    }

    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(date)
}
