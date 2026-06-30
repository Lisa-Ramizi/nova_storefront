type IconProps = {
  className?: string;
};

export function StarIcon({ className = "shrink-0" }: IconProps) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M7 1.167 8.472 4.75l3.861.306-2.944 2.528 0.889 3.75L7 9.639l-3.278 1.695 0.889-3.75L1.667 5.056l3.861-0.306L7 1.167Z"
        fill="#FBBF24"
      />
    </svg>
  );
}

export function HeartIcon({ className }: IconProps) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M9 15.75 7.912 14.74C4.05 11.19 1.5 8.865 1.5 6.094 1.5 3.84 3.255 2.25 5.438 2.25c1.2 0 2.355.562 3.062 1.462C9.207 2.812 10.362 2.25 11.562 2.25 13.745 2.25 15.5 3.84 15.5 6.094c0 2.771-2.55 5.096-6.412 8.646L9 15.75Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CartIcon({ className = "shrink-0" }: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2 2h1.2l1.4 7.2a1.2 1.2 0 0 0 1.18.96h5.84a1.2 1.2 0 0 0 1.18-0.96L14 5.2H4.2"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6.5" cy="13" r="1" fill="currentColor" />
      <circle cx="11.5" cy="13" r="1" fill="currentColor" />
    </svg>
  );
}

type ImagePlaceholderIconProps = IconProps & {
  size?: number;
};

export function ImagePlaceholderIcon({
  className = "text-[#d1d5db]",
  size = 48,
}: ImagePlaceholderIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect x="6" y="10" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="16" cy="20" r="3" stroke="currentColor" strokeWidth="2" />
      <path
        d="M10 34l10-10 6 6 4-4 8 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SearchIcon({ className = "shrink-0" }: IconProps) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="8" cy="8" r="5.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12.5 12.5 16 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
