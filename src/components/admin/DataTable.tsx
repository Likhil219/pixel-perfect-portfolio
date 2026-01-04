import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onToggleVisibility?: (item: T) => void;
  isVisible?: (item: T) => boolean;
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  onEdit,
  onDelete,
  onToggleVisibility,
  isVisible,
}: DataTableProps<T>) {
  const getValue = (item: T, key: string) => {
    const keys = key.split('.');
    let value: unknown = item;
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }
    return value;
  };

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-surface">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50 border-b border-border">
            {columns.map((col) => (
              <TableHead 
                key={String(col.key)} 
                className="text-muted-foreground font-semibold uppercase text-xs tracking-wider py-4"
              >
                {col.label}
              </TableHead>
            ))}
            <TableHead className="text-muted-foreground font-semibold uppercase text-xs tracking-wider text-right py-4">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell 
                colSpan={columns.length + 1} 
                className="text-center py-12 text-muted-foreground"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <Eye className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <span>No data available</span>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, index) => (
              <TableRow 
                key={item.id} 
                className={cn(
                  "hover:bg-muted/30 transition-colors border-b border-border last:border-0",
                  index % 2 === 0 ? "bg-transparent" : "bg-muted/10"
                )}
              >
                {columns.map((col) => (
                  <TableCell key={String(col.key)} className="text-foreground py-4">
                    {col.render ? col.render(item) : String(getValue(item, String(col.key)) ?? '')}
                  </TableCell>
                ))}
                <TableCell className="text-right py-4">
                  <div className="flex items-center justify-end gap-1">
                    {onToggleVisibility && isVisible && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onToggleVisibility(item)}
                        className={cn(
                          "h-9 w-9 rounded-lg transition-all",
                          isVisible(item) 
                            ? "text-success hover:text-success hover:bg-success/10" 
                            : "text-muted-foreground hover:bg-muted"
                        )}
                      >
                        {isVisible(item) ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Button>
                    )}
                    {onEdit && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(item)}
                        className="h-9 w-9 rounded-lg text-muted-foreground hover:text-accent hover:bg-accent/10"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(item)}
                        className="h-9 w-9 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}