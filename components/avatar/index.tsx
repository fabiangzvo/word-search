'use client'

import { forwardRef, useMemo } from 'react'
import {
  AvatarIcon,
  useAvatar,
  AvatarProps as BaseAvatarProps,
} from '@heroui/react'
import { twMerge } from 'tailwind-merge'

export interface AvatarProps extends BaseAvatarProps {
  avatarColor?: string
}

const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ avatarColor, ...props }, ref) => {
    const {
      src,
      icon = <AvatarIcon />,
      alt,
      classNames,
      slots,
      name,
      showFallback,
      fallback: fallbackComponent,
      getInitials,
      getAvatarProps,
      getImageProps,
    } = useAvatar({
      ref,
      ...props,
    })

    const fallback = useMemo(() => {
      if (!showFallback && src) return null

      const ariaLabel = alt || name || 'avatar'

      if (fallbackComponent) {
        return (
          <div
            aria-label={ariaLabel}
            className={slots.fallback({ class: classNames?.fallback })}
            role="img"
          >
            {fallbackComponent}
          </div>
        )
      }

      return name ? (
        <span
          aria-label={ariaLabel}
          className={slots.fallback({ class: classNames?.name })}
          role="img"
        >
          {getInitials(name)}
        </span>
      ) : (
        <span
          aria-label={ariaLabel}
          className={slots.icon({ class: classNames?.icon })}
          role="img"
        >
          {icon}
        </span>
      )
    }, [showFallback, src, fallbackComponent, name, classNames])

    const { className, ...rest } = getAvatarProps()

    return (
      <div {...rest} className={twMerge(className, avatarColor)}>
        {src && <img {...getImageProps()} alt={alt} />}
        {fallback}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

export default Avatar
