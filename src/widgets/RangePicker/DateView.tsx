import { twMerge } from "tailwind-merge";
import {
	Abbr,
	ArrowLineLeftIcon,
	ArrowLineRightIcon,
	Button,
	DatePickerTag,
} from "../../components";
import { ROLES } from "../../constants";
import type { DateLimitsType } from "../../types";

type MonthProps = {
	current: Date;
	from: Date;
	to: Date;
	displayMonth: number;
	displayYear: number;
	startOfWeek: number;
	dateLimits: DateLimitsType;
	lastSelection?: Date;
	onDateSelect: (day: Date) => void;
	onDisplayMonthChange: (month: number) => void;
};

export const DateView = ({
	current,
	from,
	to,
	displayMonth,
	displayYear,
	startOfWeek,
	lastSelection,
	dateLimits,
	onDateSelect,
	onDisplayMonthChange,
}: MonthProps) => {
	const currDayValue = new Date(current).setHours(0, 0, 0, 0);
	const rangeStart = new Date(from).setHours(0, 0, 0, 0);
	const rangeEnd = new Date(to).setHours(0, 0, 0, 0);
	const displayDate = new Date(displayYear, displayMonth);
	const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
	const firstDayOfMonth = displayDate.getDay();
	const daysToAddBefore = (7 + firstDayOfMonth - startOfWeek) % 7;
	const daysToAddAfter = (7 - ((daysInMonth + daysToAddBefore) % 7)) % 7;
	const [minLimit, maxLimit] = dateLimits;

	const weekDays = Array.from({ length: 7 }, (_, i) =>
		Intl.DateTimeFormat("en-US", {
			weekday: "long",
		}).format(new Date(0, 0, i + startOfWeek)),
	);
	const days = Array.from(
		{
			length: daysInMonth + daysToAddBefore + daysToAddAfter,
		},
		(_, i) => {
			const day = new Date(displayYear, displayMonth, i - daysToAddBefore + 1);
			const dayValue = day.valueOf();
			const dateTime = day.toDateString();
			const isToday = currDayValue === dayValue;
			const isSelected = dayValue >= rangeStart && dayValue <= rangeEnd;
			const isRangeStart = dayValue === rangeStart;
			const isRangeEnd = dayValue === rangeEnd;
			const isDisabled = Boolean((minLimit && day < minLimit) || (maxLimit && day > maxLimit));
			const isOutOfMonth = day.getMonth() !== displayMonth || day.getFullYear() !== displayYear;
			return {
				day,
				dateTime,
				isToday,
				isSelected,
				isRangeStart,
				isRangeEnd,
				isDisabled,
				isOutOfMonth,
			};
		},
	);

	return (
		<div
			className="flex flex-col h-full p-4"
			role={ROLES.datepickerBody}
			id="panel-date"
			aria-labelledby="tab-date"
		>
			<div className="flex justify-between" role={ROLES.datepickerNavigation}>
				<div className="flex gap-2 items-center">
					<DatePickerTag
						label="Today"
						title={current.toLocaleDateString("en-GB")}
						className="bg-black-5"
						onClick={() => onDateSelect(current)}
					/>
					{lastSelection && (
						<DatePickerTag
							label="Last selection"
							title={lastSelection.toLocaleDateString("en-GB")}
							className="bg-black-5"
							onClick={() => onDateSelect(lastSelection)}
						/>
					)}
				</div>
				<div className="flex gap-2 items-center">
					<Button
						leftIcon={ArrowLineLeftIcon}
						size="md"
						title="Previous month"
						aria-label="Previous month"
						onClick={() => onDisplayMonthChange(displayMonth - 1)}
					/>
					<Abbr
						tooltipProps={{
							label: `Display month is ${Intl.DateTimeFormat("en-US", { month: "long" }).format(
								displayDate,
							)}`,
						}}
						title={`Display month is ${Intl.DateTimeFormat("en-US", { month: "long" }).format(
							displayDate,
						)}`}
						size={12}
						role={ROLES.datepickerNavigationDisplay}
					>
						{Intl.DateTimeFormat("en-US", { month: "short" }).format(displayDate)}
					</Abbr>
					<Button
						leftIcon={ArrowLineRightIcon}
						size="md"
						title="Next month"
						aria-label="Next month"
						onClick={() => onDisplayMonthChange(displayMonth + 1)}
					/>
				</div>
			</div>
			<div className="p-4 min-h-[260px]" role={ROLES.datepickerBodyTable}>
				<div className="grid grid-cols-7 auto-rows-[38px]">
					{weekDays.map((weekDay) => (
						<Abbr
							key={weekDay}
							role={ROLES.datepickerBodyTableHeadCell}
							tooltipProps={{
								label: weekDay,
								position: "top",
								className: "text-center",
							}}
							title={weekDay}
							size={12}
						>
							{weekDay.slice(0, 2)}
						</Abbr>
					))}
					{days.map(
						({
							day,
							dateTime,
							isToday,
							isSelected,
							isRangeEnd,
							isRangeStart,
							isDisabled,
							isOutOfMonth,
						}) => (
							<Button
								key={dateTime}
								label={day.getDate()}
								textSize={12}
								variant={isSelected ? "filled" : "borderless"}
								title={dateTime}
								aria-label={dateTime}
								aria-selected={isSelected}
								aria-current={isToday ? "date" : undefined}
								role={ROLES.datepickerBodyTableCell}
								tabIndex={isDisabled ? -1 : 0}
								disabled={isDisabled}
								className={twMerge(
									"rounded-xl hover:bg-black-5 hover:text-black-100",
									isToday && !isSelected && "bg-secondary-purple",
									isOutOfMonth && "opacity-40",
									isSelected && "rounded-none",
									isRangeStart && "rounded-l-xl",
									isRangeEnd && "rounded-r-xl",
								)}
								onClick={() => {
									if (isOutOfMonth) {
										return onDisplayMonthChange(day.getMonth());
									}
									return onDateSelect(day);
								}}
							/>
						),
					)}
				</div>
			</div>
		</div>
	);
};