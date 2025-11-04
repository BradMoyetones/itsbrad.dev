"use client";

import { useEffect, useState, useTransition } from "react";

import { Fade, Flex, Line, ToggleButton } from "@once-ui-system/core";

import { routes, display } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Locale, routing } from "@/i18n/routing";
import { i18n } from "@/resources/once-ui.config";
import { useParams } from "next/navigation";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string; // Optionally allow locale, defaulting to 'en-GB'
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "es-ES" }) => {
  const [currentTime, setCurrentTime] = useState("");
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const tp = useTranslations('person');
  const tb = useTranslations('blog');
  const tw = useTranslations('work');
  const tg = useTranslations('gallery');
  const ta = useTranslations('about');

  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function handleLanguageChange(locale: string) {
    const nextLocale = locale as Locale;
    startTransition(() => {
      router.replace(
        pathname,
        {locale: nextLocale}
      )
    })
  }

  return (
    <>
      <Fade hide="s" fillWidth position="fixed" height="80" zIndex={9} />
      <Fade show="s" fillWidth position="fixed" bottom="0" to="top" height="80" zIndex={9} />
      <Flex
        fitHeight
        position="unset"
        className={styles.position}
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
      >
        <Flex paddingLeft="12" fillWidth vertical="center" textVariant="body-default-s">
          {display.location && <Flex hide="s">{tp("location")}</Flex>}
        </Flex>
        <Flex fillWidth horizontal="center">
          <Flex
            background="page"
            border="neutral-alpha-weak"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Flex gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
              {routes["/"] && (
                <ToggleButton prefixIcon="home" href={`/${params?.locale}`} selected={pathname === "/"} />
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              {routes["/about"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="person"
                    href={`/${params?.locale}/about`}
                    label={ta("label")}
                    selected={pathname === "/about"}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="person"
                    href={`/${params?.locale}/about`}
                    selected={pathname === "/about"}
                  />
                </>
              )}
              {routes["/work"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="grid"
                    href={`/${params?.locale}/work`}
                    label={tw("label")}
                    selected={pathname.startsWith("/work")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="grid"
                    href={`/${params?.locale}/work`}
                    selected={pathname.startsWith("/work")}
                  />
                </>
              )}
              {routes["/blog"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="book"
                    href={`/${params?.locale}/blog`}
                    label={tb("label")}
                    selected={pathname.startsWith("/blog")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="book"
                    href={`/${params?.locale}/blog`}
                    selected={pathname.startsWith("/blog")}
                  />
                </>
              )}
              {routes["/gallery"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="gallery"
                    href={`/${params?.locale}/gallery`}
                    label={tg("label")}
                    selected={pathname.startsWith("/gallery")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="gallery"
                    href={`/${params?.locale}/gallery`}
                    selected={pathname.startsWith("/gallery")}
                  />
                </>
              )}
              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <ThemeToggle />
                </>
              )}
              {routing.locales.length > 1 &&
                <Flex
                  background="surface" border="neutral-medium" radius="m-4"
                  padding="0" gap="2"
                  horizontal="center"
                  textVariant="body-default-xs"

                >
                  {i18n && routing.locales.map((locale, index) => (
                    <ToggleButton
                      key={index}
                      selected={params?.locale === locale}
                      label={locale.toUpperCase()}
                      onClick={() => handleLanguageChange(locale)}
                      className={isPending && 'pointer-events-none opacity-60' || ''}
                    />
                  ))}
                </Flex>
              }
            </Flex>
          </Flex>
        </Flex>
        <Flex fillWidth horizontal="end" vertical="center">
          <Flex
            paddingRight="12"
            horizontal="end" vertical="center"
            textVariant="body-default-s"
            gap="20"
          >
            <Flex hide="s">
              { display.time && (
                <TimeDisplay timeZone={tp("location")}/>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
