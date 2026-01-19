'use client';

import * as React from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    IconButton,
    Button,
    Chip,
    useTheme,
    useMediaQuery,
    Card,
    CardContent,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TodayIcon from '@mui/icons-material/Today';
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths,
} from 'date-fns';
import { ja } from 'date-fns/locale';

type EventType = 'exam' | 'holiday' | 'event';

interface CalendarEvent {
    id: number;
    title: string;
    date: Date;
    type: EventType;
}

// Mock data
const mockEvents: CalendarEvent[] = [
    { id: 1, title: '始業式', date: new Date(2026, 0, 8), type: 'event' },
    { id: 2, title: '成人の日', date: new Date(2026, 0, 12), type: 'holiday' },
    { id: 3, title: '実力テスト', date: new Date(2026, 0, 20), type: 'exam' },
    { id: 4, title: '英語検定', date: new Date(2026, 0, 24), type: 'exam' },
    { id: 5, title: '建国記念の日', date: new Date(2026, 1, 11), type: 'holiday' },
];

const getEventColor = (type: EventType) => {
    switch (type) {
        case 'exam':
            return 'error';
        case 'holiday':
            return 'success';
        case 'event':
            return 'primary';
        default:
            return 'default';
    }
};

export default function Calendar() {
    const [currentMonth, setCurrentMonth] = React.useState(new Date(2026, 0, 1)); // Start Jan 2026
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const startDate = startOfWeek(startOfMonth(currentMonth));
    const endDate = endOfWeek(endOfMonth(currentMonth));

    const calendarDays = eachDayOfInterval({
        start: startDate,
        end: endDate,
    });

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const today = () => setCurrentMonth(new Date());

    return (
        <Box sx={{ p: 2 }}>
            {/* Header */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                }}
            >
                <Typography variant="h4" component="h1" fontWeight="bold">
                    {format(currentMonth, 'yyyy年 M月', { locale: ja })}
                </Typography>
                <Box>
                    <IconButton onClick={prevMonth}>
                        <ArrowBackIosIcon />
                    </IconButton>
                    <Button
                        variant="outlined"
                        onClick={today}
                        startIcon={<TodayIcon />}
                        sx={{ mx: 1 }}
                    >
                        今日
                    </Button>
                    <IconButton onClick={nextMonth}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* Week days header */}
            <Grid container spacing={1} sx={{ mb: 1 }}>
                {['日', '月', '火', '水', '木', '金', '土'].map((day, index) => (
                    <Grid item xs={12 / 7} key={day}>
                        <Typography
                            align="center"
                            fontWeight="bold"
                            color={index === 0 ? 'error.main' : index === 6 ? 'primary.main' : 'text.secondary'}
                        >
                            {day}
                        </Typography>
                    </Grid>
                ))}
            </Grid>

            {/* Days Grid */}
            <Grid container spacing={1}>
                {calendarDays.map((day) => {
                    const isCurrentMonth = isSameMonth(day, currentMonth);
                    const isToday = isSameDay(day, new Date());
                    const dayEvents = mockEvents.filter((e) => isSameDay(e.date, day));

                    return (
                        <Grid item xs={12 / 7} key={day.toString()} sx={{ height: isMobile ? 80 : 120 }}>
                            <Paper
                                elevation={isToday ? 4 : 1}
                                sx={{
                                    height: '100%',
                                    p: 0.5,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    bgcolor: isCurrentMonth
                                        ? 'background.paper'
                                        : theme.palette.action.hover,
                                    border: isToday ? `2px solid ${theme.palette.primary.main}` : 'none',
                                    opacity: isCurrentMonth ? 1 : 0.5,
                                    overflow: 'hidden',
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    fontWeight={isToday ? 'bold' : 'normal'}
                                    color={
                                        isSameDay(day, new Date())
                                            ? 'primary.main'
                                            : 'text.primary'
                                    }
                                    sx={{ mb: 0.5 }}
                                >
                                    {format(day, 'd')}
                                </Typography>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                    {dayEvents.map((event) => (
                                        <Chip
                                            key={event.id}
                                            label={event.title}
                                            size="small"
                                            color={getEventColor(event.type) as any}
                                            sx={{
                                                height: 20,
                                                fontSize: '0.65rem',
                                                '& .MuiChip-label': { px: 1 },
                                                cursor: 'pointer',
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Mobile Agenda View (Optional, but good for responsiveness) */}
            {isMobile && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>今月の予定</Typography>
                    {mockEvents
                        .filter((e) => isSameMonth(e.date, currentMonth))
                        .sort((a, b) => a.date.getTime() - b.date.getTime())
                        .map((event) => (
                            <Card key={event.id} sx={{ mb: 1 }}>
                                <CardContent sx={{ py: 1, '&:last-child': { pb: 1 }, display: 'flex', alignItems: 'center' }}>
                                    <Box
                                        sx={{
                                            width: 4,
                                            height: 40,
                                            bgcolor: `${getEventColor(event.type)}.main`,
                                            mr: 2,
                                            borderRadius: 1,
                                        }}
                                    />
                                    <Box>
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            {format(event.date, 'M月d日 (EE)', { locale: ja })}
                                        </Typography>
                                        <Typography variant="body2">{event.title}</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                </Box>
            )}
        </Box>
    );
}
