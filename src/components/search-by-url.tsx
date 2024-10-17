"use client";

import { useTransition, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Loader2, SearchIcon } from "lucide-react";

type SearchInputProps = {
	placeholder: string;
	debounceTimeout?: number;
	debounce?: boolean;
};

export default function SearchByURLParamsInput({
	placeholder = "Buscar...",
	debounceTimeout = 500,
	debounce = false,
}: SearchInputProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const searchTerm = searchParams.get("name") ?? "";
	const inputRef = useRef<HTMLInputElement>(null);
	const [isPending, startTransition] = useTransition();
	const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const updateQuery = useCallback(
		(term: string) => {
			const params = new URLSearchParams(searchParams);
			if (term) {
				params.set("name", term);
			} else {
				params.delete("name");
			}
			startTransition(() => {
				router.replace(`?${params.toString()}`);
			});
		},
		[router, searchParams],
	);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const term = e.target.value;

		if (debounce) {
			if (debounceTimeoutRef.current) {
				clearTimeout(debounceTimeoutRef.current);
			}
			debounceTimeoutRef.current = setTimeout(() => {
				updateQuery(term);
			}, debounceTimeout);
		} else {
			updateQuery(term);
		}
	};

	if (inputRef.current && inputRef.current.value !== searchTerm && !isPending) {
		inputRef.current.value = searchTerm;
	}
	return (
		<div className="w-full sm:w-80">
			<div className="w-full relative">
				<Input
					type="search"
					autoComplete="off"
					ref={inputRef}
					name="q"
					defaultValue={searchTerm}
					onChange={handleSearchChange}
					placeholder={placeholder}
					className="pl-10 py-2 border-blue-300 focus:border-blue-500 focus:ring-blue-500 focus-visible:ring-blue-500 w-full"
				/>
				<div className="absolute left-0 top-1/2 transform -translate-y-1/2">
					{isPending ? (
						<Loader2
							className="animate-spin absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400"
							size={20}
						/>
					) : (
						<SearchIcon
							className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400"
							size={20}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
