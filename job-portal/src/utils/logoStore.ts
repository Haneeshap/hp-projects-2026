export function getLogoOverride(jobId: string): string | null {
  try {
    return localStorage.getItem(`logo:${jobId}`)
  } catch (e) {
    return null
  }
}

export function removeLogoOverride(jobId: string) {
  try {
    localStorage.removeItem(`logo:${jobId}`)
  } catch (e) {
    // ignore
  }
}

export function saveLogoOverride(jobId: string, dataUrl: string) {
  try {
    localStorage.setItem(`logo:${jobId}`, dataUrl)
  } catch (e) {
    // ignore quota errors
  }
}

export async function fileToDataUrl(file: File): Promise<string> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
