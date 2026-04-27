"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { Cookie, X, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useFocusTrap } from "@/hooks/use-focus-trap"

// ConsentCategory type is used in the consent state interface

interface ConsentState {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

interface ConsentContextType {
  consent: ConsentState
  hasConsented: boolean
  showBanner: boolean
  acceptAll: () => void
  rejectAll: () => void
  savePreferences: (consent: ConsentState) => void
}

const ConsentContext = React.createContext<ConsentContextType | undefined>(undefined)

const defaultConsent: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = React.useState<ConsentState>(defaultConsent)
  const [hasConsented, setHasConsented] = React.useState(false)
  const [showBanner, setShowBanner] = React.useState(false)
  const [showSettings, setShowSettings] = React.useState(false)
  const [tempPreferences, setTempPreferences] = React.useState<ConsentState>(defaultConsent)

  React.useEffect(() => {
    const stored = localStorage.getItem("cookie_consent")
    // Use requestAnimationFrame to avoid setState in effect body
    requestAnimationFrame(() => {
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          setConsent(parsed)
          setHasConsented(true)
        } catch {
          setShowBanner(true)
        }
      } else {
        setShowBanner(true)
      }
    })
  }, [])

  const acceptAll = () => {
    const fullConsent: ConsentState = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    }
    setConsent(fullConsent)
    localStorage.setItem("cookie_consent", JSON.stringify(fullConsent))
    setHasConsented(true)
    setShowBanner(false)
    setShowSettings(false)
  }

  const rejectAll = () => {
    setConsent(defaultConsent)
    localStorage.setItem("cookie_consent", JSON.stringify(defaultConsent))
    setHasConsented(true)
    setShowBanner(false)
    setShowSettings(false)
  }

  const savePreferences = (prefs: ConsentState) => {
    setConsent(prefs)
    localStorage.setItem("cookie_consent", JSON.stringify(prefs))
    setHasConsented(true)
    setShowBanner(false)
    setShowSettings(false)
  }

  const openSettings = () => {
    setTempPreferences(consent)
    setShowSettings(true)
  }

  const handleSaveSettings = () => {
    savePreferences(tempPreferences)
  }

  return (
    <ConsentContext.Provider value={{ consent, hasConsented, showBanner, acceptAll, rejectAll, savePreferences }}>
      {children}
      {showBanner && (
        <CookieBanner 
          onAccept={acceptAll} 
          onReject={rejectAll} 
          onManage={openSettings}
        />
      )}
      {showSettings && (
        <CookieSettingsModal 
          preferences={tempPreferences}
          onPreferencesChange={setTempPreferences}
          onSave={handleSaveSettings}
          onClose={() => setShowSettings(false)}
          onAcceptAll={acceptAll}
          onRejectAll={rejectAll}
        />
      )}
    </ConsentContext.Provider>
  )
}

export function useConsent() {
  const context = React.useContext(ConsentContext)
  if (!context) {
    throw new Error("useConsent must be used within a ConsentProvider")
  }
  return context
}

function CookieBanner({ onAccept, onReject, onManage }: { onAccept: () => void; onReject: () => void; onManage: () => void }) {
  const t = useTranslations("consent")
  const { containerRef: bannerRef } = useFocusTrap({ isActive: true, onEscape: onReject })

  return (
    <div
      ref={bannerRef as React.RefObject<HTMLDivElement>}
      role="dialog" 
      aria-modal="false" 
      aria-label={t("bannerLabel")}
      className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background border-t shadow-lg"
    >
      <Card className="max-w-4xl mx-auto border-0 shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Cookie className="w-5 h-5" aria-hidden="true" />
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-sm text-muted-foreground mb-4">
            {t("description")}
          </p>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded">{t("necessaryTag")}</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">{t("analyticsTag")}</span>
            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">{t("marketingTag")}</span>
            <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded">{t("functionalTag")}</span>
          </div>
        </CardContent>
        <CardFooter className="gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={onReject}>
            {t("rejectAll")}
          </Button>
          <Button variant="outline" size="sm" onClick={onManage}>
            <Settings className="w-4 h-4 mr-2" aria-hidden="true" />
            {t("managePreferences")}
          </Button>
          <Button size="sm" onClick={onAccept}>
            {t("acceptAll")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

interface CookieSettingsModalProps {
  preferences: ConsentState
  onPreferencesChange: (prefs: ConsentState) => void
  onSave: () => void
  onClose: () => void
  onAcceptAll: () => void
  onRejectAll: () => void
}

function CookieSettingsModal({ preferences, onPreferencesChange, onSave, onClose, onAcceptAll, onRejectAll }: CookieSettingsModalProps) {
  const t = useTranslations("consent")
  
  const categories = [
    { key: 'necessary' as const, label: t("necessary"), description: t("necessaryDesc"), enabled: true },
    { key: 'analytics' as const, label: t("analytics"), description: t("analyticsDesc"), enabled: preferences.analytics },
    { key: 'marketing' as const, label: t("marketing"), description: t("marketingDesc"), enabled: preferences.marketing },
    { key: 'functional' as const, label: t("functional"), description: t("functionalDesc"), enabled: preferences.functional },
  ]

  const handleToggle = (key: keyof ConsentState) => {
    if (key === 'necessary') return
    onPreferencesChange({ ...preferences, [key]: !preferences[key] })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Settings className="w-5 h-5" />
            {t("settingsTitle")}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">
            {t("settingsDescription")}
          </p>
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.key} className="flex items-start justify-between gap-4 p-4 rounded-lg border">
                <div className="space-y-1">
                  <Label className="font-medium">
                    {category.label}
                    {category.key === 'necessary' && <span className="text-xs text-muted-foreground ml-2">({t("required")})</span>}
                  </Label>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
                <Switch
                  checked={category.key === 'necessary' ? true : category.enabled}
                  onCheckedChange={() => handleToggle(category.key)}
                  disabled={category.key === 'necessary'}
                />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between gap-2">
          <Button variant="outline" onClick={onRejectAll}>
            {t("rejectAll")}
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onAcceptAll}>
              {t("acceptAll")}
            </Button>
            <Button onClick={onSave}>
              {t("savePreferences")}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
